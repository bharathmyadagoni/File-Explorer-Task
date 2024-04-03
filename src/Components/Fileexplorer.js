import React, { useState } from 'react';
import "../Components/Fileexplorer.css"
import { AiFillFile } from "react-icons/ai";
const FileExplorer = () => {
    const Filedata = { 
        name: 'root',
        type: 'folder',
        children: [
          { name: 'Documents', type: 'folder', children: [] },
          { name: 'Downloads', type: 'folder', children: [] },
          { name: 'Pictures', type: 'folder', children: [] },
          { name: 'File1.txt', type: 'file'},
          { name: 'File2.pdf', type: 'file'},
        ]
      }
    const [fileSystem, setFileSystem] = useState(Filedata);
    
    const handleCreateFolder = (parentFolder) => {
        const newFolder = { name: 'New Folder', type: 'folder', children: [] };
        const updatedParentFolder = {
          ...parentFolder,
          children: [...(parentFolder.children || []), newFolder],
        };
        const updatedFileSystem = updateFileSystem(fileSystem, updatedParentFolder);
        setFileSystem(updatedFileSystem); // Trigger re-render
      };
      const handleCreateFile = (parentFolder) => {
        const newFile = { name: 'New File.txt', type: 'file', content: '' };
        const updatedParentFolder = {
          ...parentFolder,
          children: [...parentFolder.children, newFile],
        };
        const updatedFileSystem = updateFileSystem(fileSystem, updatedParentFolder);
        setFileSystem(updatedFileSystem); // Trigger re-render
      };
    
      const handleRename = (file, newName) => {
        file.name = newName;
        const updatedFileSystem = updateFileSystem(fileSystem, file);
        setFileSystem(updatedFileSystem); // Trigger re-render
      };
    
      const handleDelete = (parentFolder, fileIndex) => {
        parentFolder.children.splice(fileIndex, 1);
        const updatedFileSystem = updateFileSystem(fileSystem, parentFolder);
        setFileSystem(updatedFileSystem); // Trigger re-render
      };
    
      const updateFileSystem = (fileSystem, target) => {
        if (fileSystem === target) {
          return { ...fileSystem };
        }
        if (fileSystem.children) {
          return {
            ...fileSystem,
            children: fileSystem.children.map((child) =>
              child === target ? { ...target } : updateFileSystem(child, target)
            ),
          };
        }
        return fileSystem;
      };

  return (
    <div className="file-explorer">
      <center>
      <h2><i className='file-explorer-icon'><AiFillFile/></i>File Explorer</h2>
      <ul>
        {fileSystem.children.map((file, index) => (
          <li key={index}>
            {file.type === 'folder' ? (
              <>
                <button className="folder" onClick={() => console.log('Open folder:', file.name)}>{file.name}</button>
                <button className="create-btn" onClick={() => handleCreateFolder(file)}>Create Folder</button>
                <button className="create-btn" onClick={() => handleCreateFile(file)}>Create File</button>
              </>
            ) : (
              <span className='span-element'>{file.name}</span>
            )}
            <button className="edit-btn" onClick={() => handleRename(file, prompt('Enter new name:', file.name))}>Rename</button>
            <button className="delete-btn" onClick={() => handleDelete(fileSystem, index)}>Delete</button>
          </li>
        ))}
      </ul>
      </center>
    </div>
  );
};

export default FileExplorer;