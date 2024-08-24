import React from 'react';
import "./DialogCSS.css";



interface RepositoryData {
    name: string;
    description: string;
    language: string | null;
    forks_count: number;
    created_at: string;
  }
  
interface DialogProps {
  item: RepositoryData | null;
  isOpen: boolean;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <h2>{item.name}</h2>
        <p><strong>Description:</strong> {item.description}</p>
        {/* <p><strong>Language:</strong> {item.language || 'N/A'}</p> */}
        {/* <p><strong>Forks Count:</strong> {item.forks_count}</p> */}
        <p><strong>Created At:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Dialog;
