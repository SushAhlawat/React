import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap'; 
import Main from './MainComponent';

class Dishdetail extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }
    renderDish(dish) {
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
    renderComments(dish){
        if(dish!=null){
            if(dish.comments != null){
                const comnt = dish.comments.map(comment => {
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
                </div>
                );
               
            }else{
                return(
                    <div></div>
                );
            }
        }else{}
    }
    render(){
        return(
            <div className = "container">
                <div className = "row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish)}
                </div>
            </div>    
			   
    );
    }
}
export default Dishdetail;