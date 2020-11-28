import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
   function RenderDish({dish}){
    if (dish != null)
    return(
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
    );
else 
    return(
        <div></div>
    );
   }
   
   
function RenderComments({comments, postComment, dishId}) {
    if (comments!=null){
       /* 
       const comment = comments.map(c => {
           let d = new Date();
           let m = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"];
           //let date = m[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
           return (
            <div>
           <li>{c.comment}</li>
           <li key={c.id.toString()} className="m-1">-- {c.author} {m[d.getMonth()]} {d.getDate()}, {d.getFullYear()}</li>
           </div>
           );

       });
       */
       return(
        <div>
          <h4>Comments</h4>
            <ul className="list-unstyled">
            <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
                <CommentForm dishId={dishId} postComment={postComment} />
            </ul>
        </div>
     );
    }
    else{
        return(<div></div>);
    }

 }
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
        //console.log('Current State is: ' + JSON.stringify(values));
        //alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
        this.toggleModal();
        //alert('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
                            <Control.text className="form-control" id="author" model=".author" name="author"
                             validators = {
                                 {
                                     required, minLength: minLength(2), maxLength: maxLength(15)
                                 }
                             }
                            />
                            <Errors
                                className="text-danger"
                                model=".author"
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
                            <Control.textarea className="form-control" id="comment" model=".comment" name="comment"
                            
                            validators = {
                                {
                                    required, minLength: minLength(2), maxLength: maxLength(15)
                                }
                            }
                            >
                            </Control.textarea>
                            <Errors
                                className="text-danger"
                                model=".comment"
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
 const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
    return(
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}
                    postComment={props.postComment}
            dishId={props.dish.id}
      />
            </div>
           
        </div>
        </div>
       );
 }




export default DishDetail;

/*

Return a <div> from the render() function. 
This <div> should use the Bootstrap row class to position the content within the <div>. 
This div will display both the details of the dish in a Card and the list of comments side-by-side for medium to extra large screens, 
but will stack them for xs and sm screens.
The card should be enclosed inside a <div> appropriate Bootstrap column classes so that it occupies the entire 12 columns for the 
xs and sm screen sizes, and 5 columns for md screens and above. Also apply a class of m-1 to this div.
The comments should be enclosed in a <div> to which you apply appropriate column 
classes so that it occupies the entire 12 columns for the xs and sm screen sizes, 
and 5 columns for md screens and above. Also apply a class of m-1 to this div.
If the dish is null then you should return an empty <div>
*/