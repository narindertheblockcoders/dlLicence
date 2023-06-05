import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const DeleteClientModal = ({ show, setShow, id, getAllClients }) => {

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteUser = async () => {
        try {

            const token = localStorage.getItem("token")
            const response = await axios.post("/api/deleteClient", { token: token, clientId: id })
            toast.success("Client deleted successfully")
            setShow(false)
            getAllClients()

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
                    <Modal.Title></Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <h2>
                        Do you want to delete.
                    </h2>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='closeBtn' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='deleteBtn' onClick={deleteUser}>Delete</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
}

export default DeleteClientModal