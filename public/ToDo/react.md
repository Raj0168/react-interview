---

## **React.js System Design Case Studies**

### **Case 1: Dashboard with Configurable Widgets**

**Scenario:**
You need to design an analytics dashboard where users can add, remove, and rearrange widgets (e.g., charts, tables, KPIs).
**Requirements:**

- Each widget fetches its own API data independently.
- Widget layout should persist for each user (backend API or localStorage).
- Support light/dark mode.
- Responsive grid layout.
  **Key Design Points:**
- Component hierarchy: `Dashboard` → `WidgetContainer` → `Widget`.
- State management for widget order (Context API / Zustand).
- Grid system (e.g., CSS Grid or `react-grid-layout`).
- API abstraction for each widget.

---

### **Case 2: E-Commerce Product Listing Page**

**Scenario:**
A product catalog page with filtering, sorting, and pagination.
**Requirements:**

- Filters: category, price range, rating.
- Sorting: price low-to-high, high-to-low, newest.
- Pagination (server-side or infinite scroll).
- Show loading skeletons.
  **Key Design Points:**
- Separation of filter state and product state.
- Debounced API calls for filters.
- Reusable `ProductCard` component.
- Accessibility for screen readers.

---

### **Case 3: Chat Application UI**

**Scenario:**
A 1-to-1 and group chat interface for a messaging app.
**Requirements:**

- Real-time updates via WebSocket.
- Infinite scroll for older messages.
- Online/offline indicators for users.
- Typing indicator.
  **Key Design Points:**
- Virtualized message list (`react-window`).
- WebSocket subscription handling.
- Message input component with emoji picker.
- Store messages per conversation in state.

---

### **Case 4: Form Builder Application**

**Scenario:**
A UI tool for creating and editing dynamic forms.
**Requirements:**

- Drag-and-drop question fields (text, dropdown, checkbox).
- Editable labels and placeholders.
- Preview mode vs edit mode.
- Save form structure to backend.
  **Key Design Points:**
- Component: `FormBuilder` → `FieldEditor` → `Field`.
- State: Current form schema (array of field configs).
- Conditional rendering for edit/preview.
- Controlled components for all inputs.

---

### **Case 5: File Manager Web App**

**Scenario:**
A Google Drive–like file explorer.
**Requirements:**

- Folder navigation (breadcrumb style).
- Upload, rename, delete files.
- Context menu on right click.
- Multi-select files with shift/ctrl click.
  **Key Design Points:**
- Recursive folder rendering.
- Context API for current folder path.
- File operations with optimistic UI updates.
- Drag-and-drop file uploads.

---
