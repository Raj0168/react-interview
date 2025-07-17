import { useEffect, useState } from "react";
import * as monaco from "monaco-editor";
import MonacoEditor from "react-monaco-editor";
import * as ts from "typescript";
import "../styles/Sandbox.css";

type Language = "typescript" | "javascript";
type Tab = "output" | "compiled";

const SandboxPage = () => {
  const [language, setLanguage] = useState<Language>("typescript");
  const [fileList, setFileList] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [compiledJS, setCompiledJS] = useState<string>("");
  const [activeTab, setActiveTab] = useState<Tab>("output");
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const loadFileList = async () => {
      const res = await fetch("/Codes/files.json");
      const json: { [key: string]: string[] } = await res.json();
      const files: string[] = json[language] || [];
      setFileList(files);
      setSelectedFile(files[0] || "");
    };
    loadFileList();
  }, [language]);

  useEffect(() => {
    const loadCode = async () => {
      if (!selectedFile) return;
      const filePath = `/Codes/${
        language === "typescript" ? "TS" : "JS"
      }/${selectedFile}`;
      const res = await fetch(filePath);
      const text = await res.text();
      setCode(text);
      setOutput("");
      setCompiledJS("");
    };
    loadCode();
  }, [selectedFile, language]);

  const compileCode = () => {
    let codeToRun = code;
    let transpiled = "";

    if (language === "typescript") {
      const result = ts.transpileModule(code, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2017,
        },
      });
      codeToRun = result.outputText;
      transpiled = result.outputText;
    } else {
      transpiled = code;
    }

    setCompiledJS(transpiled);

    const logs: string[] = [];

    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args: any[]) => {
      logs.push(args.map(String).join(" "));
    };
    console.error = (...args: any[]) => {
      logs.push(
        `<span class="output-error">Error: ${args.map(String).join(" ")}</span>`
      );
    };

    try {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const iframeWindow = iframe.contentWindow;
      if (iframeWindow) {
        const win = iframeWindow as Window & typeof globalThis;
        win.console.log = console.log;
        win.console.error = console.error;
        win.eval(`(() => { ${codeToRun} })()`);
      }
      document.body.removeChild(iframe);
    } catch (err: any) {
      logs.push(
        `<span class="output-error">Execution Error: ${err.message}</span>`
      );
    }

    console.log = originalLog;
    console.error = originalError;

    setOutput(logs.join("\n"));
    setActiveTab("output");
  };

  const getStorageKey = () => `sandbox:${language}:${selectedFile}`;

  const handleSave = () => {
    if (!selectedFile) return alert("No file selected to save.");
    localStorage.setItem(getStorageKey(), code);
    // alert(`Saved ${selectedFile} (${language}) to local storage.`);
  };

  const handleLoad = () => {
    if (!selectedFile) return alert("No file selected to load.");
    const stored = localStorage.getItem(getStorageKey());
    if (stored != null) {
      setCode(stored);
      // alert(`Loaded ${selectedFile} (${language}) from local storage.`);
    } else {
      alert("No saved content found.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        compileCode();
      } else if (e.altKey && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        formatCode();
      } else if (e.ctrlKey && (e.key === "+" || e.key === "=")) {
        e.preventDefault();
        setFontSize((s) => Math.min(s + 1, 32));
      } else if (e.ctrlKey && e.key === "-") {
        e.preventDefault();
        setFontSize((s) => Math.max(s - 1, 8));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code, language]);

  const formatCode = () => {
    const formatted = ts.transpileModule(code, {
      compilerOptions: { target: ts.ScriptTarget.ES2017 },
      reportDiagnostics: false,
    }).outputText;

    setCode(formatted.trim());
  };

  return (
    <div className="sandbox-container">
      <div className="editor-section">
        <div className="sandbox-controls">
          <select
            className="sandbox-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
          </select>

          <select
            className="sandbox-select"
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
          >
            {fileList.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>

          <button onClick={compileCode} className="sandbox-button">
            Run (Ctrl+Enter)
          </button>
          <button onClick={handleSave} className="sandbox-button">
            Save
          </button>
          <button onClick={handleLoad} className="sandbox-button">
            Load
          </button>
          <button onClick={formatCode} className="sandbox-button">
            Format (Alt+Shift+F)
          </button>
          <button
            onClick={() => setFontSize((s) => Math.min(s + 1, 32))}
            className="sandbox-button"
          >
            A+
          </button>
          <button
            onClick={() => setFontSize((s) => Math.max(s - 1, 8))}
            className="sandbox-button"
          >
            A-
          </button>
        </div>

        <MonacoEditor
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(newVal) => setCode(newVal || "")}
          className="monaco-editor-instance"
          editorDidMount={(_, monaco) => {
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
              target: monaco.languages.typescript.ScriptTarget.ESNext,
              allowNonTsExtensions: true,
              module: monaco.languages.typescript.ModuleKind.ESNext,
            });

            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
              target: monaco.languages.typescript.ScriptTarget.ESNext,
              allowNonTsExtensions: true,
              module: monaco.languages.typescript.ModuleKind.ESNext,
            });

            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
              {
                noSemanticValidation: false,
                noSyntaxValidation: false,
              }
            );

            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
              {
                noSemanticValidation: false,
                noSyntaxValidation: false,
              }
            );
          }}
          options={{
            fontSize,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,

            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            snippetSuggestions: "inline",
            parameterHints: { enabled: true },
            hover: { enabled: true },

            autoClosingQuotes: "always",
            formatOnPaste: true,

            dragAndDrop: true,
            contextmenu: true,

            renderWhitespace: "all",
            fontFamily: "Fira Code, monospace",
            glyphMargin: true,
          }}
        />
      </div>

      <div className="output-section">
        <div className="tab-buttons">
          <button
            onClick={() => setActiveTab("output")}
            className={`tab-button ${activeTab === "output" ? "active" : ""}`}
          >
            Output
          </button>
          <button
            onClick={() => setActiveTab("compiled")}
            className={`tab-button ${activeTab === "compiled" ? "active" : ""}`}
          >
            Compiled JS
          </button>
        </div>

        {activeTab === "output" && (
          <pre
            className="output-content"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        )}

        {activeTab === "compiled" && (
          <pre className="output-content">{compiledJS}</pre>
        )}
      </div>
    </div>
  );
};

export default SandboxPage;
