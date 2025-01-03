import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { userDashboardApi } from "../apis/User";
import { createWorkspaceApi, fetchWorkspacesApi, deleteWorkspaceApi } from "../apis/Workspace";
import { fetchFlowsApi, deleteFlowApi } from "../apis/Flow";

import WorkspaceList from '../components/dashboard/WorkspaceList';
import FlowGrid from '../components/dashboard/FlowGrid';
import CreateWorkspaceDialog from '../components/dashboard/CreateWorkspaceDialog';
import ConfirmationDialog from '../components/dashboard/ConfirmationDialog';

import styles from '../assets/DashboardLayout.module.css';

function DashboardHome() {
    const token = useAuth();
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState({});
    
    const [workspaces, setWorkspaces] = useState([]);
    const [workspaceId, setWorkspaceId] = useState(null);
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceError, setWorkspaceError] = useState('');

    const [flows, setFlows] = useState([]);
    const [flowId, setFlowId] = useState(null);
    const [itemType, setItemType] = useState(null);

    const [isMenuExpanded, setMenuExpanded] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleCreateWorkspace = async () => {
        setWorkspaceError('');
        if (workspaceName.trim().length === 0) {
            setWorkspaceError('Workspace name is required');
            return;
        }

        const response = await createWorkspaceApi(workspaceName, token);
        if (response) {
            setShowCreateDialog(false);
            fetchWorkspaces();
        }
    };

    const userDashboard = async () => {
        const data = await userDashboardApi(token);
        if (data) { setUserProfile(data); fetchWorkspaces(); fetchFlows(); }
    };

    const fetchWorkspaces = async () => {
        const data = await fetchWorkspacesApi(token);
        if (data) setWorkspaces(data);
    };

    const deleteWorkspace = async () => {
        const data = await deleteWorkspaceApi(workspaceId, token);
        if (data) { setShowConfirmDialog(false); fetchWorkspaces(); };
    };

    const fetchFlows = async () => {
        const data = await fetchFlowsApi(token);
        if (data) setFlows(data);
    };

    const deleteFlow = async () => {
        const data = await deleteFlowApi(flowId, token);
        if (data) { setShowConfirmDialog(false); fetchFlows(); };
    };

    useEffect(() => {
        if (token) { userDashboard(); }
    }, [token]);

    return (
        <div className={styles.dash_Container}>
            <nav className={styles.top_Nav}>
                <div className={`${styles.menu_Wrapper} ${isMenuExpanded ? styles.active : ''}`}>
                    <button 
                        className={styles.profile_Button}
                        onClick={() => setMenuExpanded(!isMenuExpanded)}
                    >
                        <span>{userProfile.username ? `${userProfile.username}'s Hub` : "My Hub"}</span>
                        <i className={styles.chevron_Icon} />
                    </button>
                    <div className={styles.menu_Items}>
                        <Link to="/account">Account</Link>
                        <Link 
                            to="/login" 
                            className={styles.sign_Out}
                            onClick={() => localStorage.removeItem('authToken')}
                        >
                            Sign Out
                        </Link>
                    </div>
                </div>
            </nav>

            <main className={styles.content_Grid}>
                <section className={styles.workspaceSection}>
                    <button 
                        className={styles.createWorkspace_Btn}
                        onClick={() => setShowCreateDialog(true)}
                    >
                        <i className={styles.folder_Icon} />
                        <span>New Workspace</span>
                    </button>
                    
                    <WorkspaceList
                        workspaces={workspaces}
                        onDelete={(id) => handleDeleteClick(id, 'workspace')}
                    />
                </section>

                <section className={styles.flow_Section}>
                    <Link to="/builder" className={styles.createFlowCard}>
                        <i className={styles.plusIcon} />
                        <span>Create Flow</span>
                    </Link>
                    
                    <FlowGrid
                        flows={flows}
                        onDelete={(id) => handleDeleteClick(id, 'flow')}
                    />
                </section>

                {/* Dialogs */}
                {showCreateDialog && (
                    <CreateWorkspaceDialog
                        name={workspaceName}
                        error={workspaceError}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        onSubmit={handleCreateWorkspace}
                        onClose={() => setShowCreateDialog(false)}
                    />
                )}

                {showConfirmDialog && (
                    <ConfirmationDialog
                        itemType={itemType}
                        onConfirm={itemType === 'workspace' ? deleteWorkspace : deleteFlow}
                        onClose={() => setShowConfirmDialog(false)}
                    />
                )}
            </main>
        </div>
    );
}

export default DashboardHome;