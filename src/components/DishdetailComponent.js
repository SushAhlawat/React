import React, {Component} from 'react';
import {Card, CardImg,  CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap'; 
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false,
          };
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
      }

      handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
       
    }

    render(){
        return(
            <div>
            <Button outline onClick = {this.toggleModal}>
                <span className = "fa fa-pencil">Submit Comment</span>
            </Button>
            <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
            <ModalHeader>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className = "form-group, m-1">
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model = ".contactType" name = "contactType"
                                        className = "form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </Row>
                    <Row className = "form-group, m-1">
                        <Label htmlFor="author">Your Name</Label>
                        <Control.text model=".author" id="author" name="author"
                        placeholder = "Your Name"
                        className = "form-control"
                        validators = {{
                            required, minLength: minLength(3), maxLength: maxLength(15)
                        }}
                         />
                    <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}
                    
                             />
                    </Row>
                    <Row className = "form-group, m-1">
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model = ".comment" id="comment" name="comment"
                                rows = "6"
                                className = "form-control"
                                />
                    </Row>
                    <Button type="submit" className = "m-1" value="submit" color="primary">Submit</Button>

                </LocalForm>
            </ModalBody>
        </Modal>
        </div>
        );
    }
}    
    
function RenderDish({dish}) {
        if (dish != null){
            return(
                   <div className = "col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                        </Card>
                    </div>        
            );
        }else{
            return(
                <div></div>
            );
         }
    }
    function RenderComments({comments}){

        
            if(comments != null){
                const comnt = comments.map(comment => {
                    return(
                        <li key = {comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, 
                            {new Intl.DateTimeFormat('en-US', 
                            { year: 'numeric', 
                            month: 'short', 
                            day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                    );
                })
                return(
                <div className = "col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                    {comnt}
                    </ul>
                    <CommentForm/>
                </div>
                );
               
            }else{
                return(
                    <div></div>
                );
            }
        
    }
    const Dishdetail = (props) => {
        return(
            <div className = "container">
                <div className = "row">
					<Breadcrumb>
						<BreadcrumbItem><Link to = '/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className = "col-12">
                    <h3>{props.dish.name}</h3>
					</div>
				</div>
                <div className = "row">
                    <RenderDish dish = {props.dish}/>
                    <RenderComments comments = {props.comments}/>
                </div>
            </div>    
			   
    );
    }

export default Dishdetail;