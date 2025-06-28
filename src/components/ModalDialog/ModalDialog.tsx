import React, { useState } from "react";
import "../../styles/Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  code?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  code,
}) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>

        {code ? (
          <>
            <nav
              className="modal-tabs"
              role="tablist"
              aria-label="Preview and code tabs"
            >
              <button
                role="tab"
                aria-selected={activeTab === "preview"}
                className={`modal-tab ${
                  activeTab === "preview" ? "active" : ""
                }`}
                onClick={() => setActiveTab("preview")}
                id="tab-preview"
                aria-controls="tabpanel-preview"
                tabIndex={activeTab === "preview" ? 0 : -1}
              >
                Preview
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "code"}
                className={`modal-tab ${activeTab === "code" ? "active" : ""}`}
                onClick={() => setActiveTab("code")}
                id="tab-code"
                aria-controls="tabpanel-code"
                tabIndex={activeTab === "code" ? 0 : -1}
              >
                Code
              </button>
            </nav>

            <section
              id="tabpanel-preview"
              role="tabpanel"
              aria-labelledby="tab-preview"
              hidden={activeTab !== "preview"}
              className="modal-tabpanel"
            >
              {children}
            </section>

            <section
              id="tabpanel-code"
              role="tabpanel"
              aria-labelledby="tab-code"
              hidden={activeTab !== "code"}
              className="modal-tabpanel code-tabpanel"
            >
              <pre>
                <code>{code}</code>
              </pre>
            </section>
          </>
        ) : (
          <div className="modal-body">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
