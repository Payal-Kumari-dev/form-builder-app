import React from 'react';
import styles from './WorkspaceList.module.css';

function WorkspaceList({ workspaces, onDelete }) {
    return (
        <div className={styles.workspaceList}>
            {workspaces.map((workspace) => (
                <div key={workspace.id} className={styles.workspace_Item}>
                    <div className={styles.workspaceInfo}>
                        <i className={styles.folder_Icon} />
                        <span>{workspace.name}</span>
                    </div>
                    <button
                        className={styles.deleteButton}
                        onClick={() => onDelete(workspace.id)}
                        aria-label="Delete workspace"
                    >
                        <i className={styles.trashIcon} />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default WorkspaceList; 