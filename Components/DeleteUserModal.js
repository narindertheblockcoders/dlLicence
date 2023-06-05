import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const DeleteUserModal = ({ show, setShow, uid, getAllUsers }) => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteUser = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.post("/api/deleteUser", { token: token, userId: uid })
            toast.success("data deleted successfully")
            setShow(false)
            getAllUsers()
        } catch (error) {
            console.log("Error:::-->", error)
            toast.error("Please try again")
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                className='deleteModals'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete user.</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button className='closeBtn' onClick={handleClose}>
                        No
                    </Button>
                    <Button className='deleteBtn' onClick={deleteUser}>Delete</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
}

export default DeleteUserModal