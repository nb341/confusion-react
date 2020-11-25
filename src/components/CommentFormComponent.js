import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader, FormGroup, Label} from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(){
        super();
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }
   render(){
       return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                        <FormGroup>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select className="custom-select" model=".rating" id="rating" name="rating"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Control.select>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label htmlFor="name">Your Name</Label>
                            <Control.text className="form-control" id="name" model=".name" name="name"
                             validators = {
                                 {
                                     required, minLength: minLength(2), maxLength: maxLength(15)
                                 }
                             }
                            />
                            <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={
                                    {
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be less than 15 characters'
                                    }
                                }
                            />

                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea className="form-control" id="comment" model=".comment" name="comment"/>
                            <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={
                                    {
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be less than 15 characters'
                                    }
                                }
                            />
                        </FormGroup>
                        <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
       );
   }
}

export default CommentForm;