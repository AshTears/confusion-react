/* @author: Ashika Shallow */

import React,{Component} from "react"
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Row,
Button, Label, Modal, ModalHeader, ModalBody} from "reactstrap"
import {Link} from "react-router-dom"
import {Control, LocalForm, Errors} from 'react-redux-form'

function GetDateString(date){
	return new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	}).format(new Date(Date.parse(date)))
}
	
function RenderDish({dish}){ 
	if (dish != null){
		return(
			<div key={dish.id}>
				<Card>
					<CardImg width="100%" src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			</div>			
		)
	}else return <div></div>;
}
	
function RenderComments({comments}){		
	if (comments != null){
		const commentList = comments.map(item =>
			<li key={item.id}>
				<p>{item.comment}</p>
				<p>-- {item.author}, {GetDateString(item.date)}</p>
			</li>				
		);
		return (
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">{commentList}</ul>
				<CommentForm/>
			</div>
		)
	}
	else return <div></div>		
}
const required = val => val && val.length
const maxLength = len => val => !(val) || (val.length <= len)
const minLength = len => val => (val) && (val.length >= len)

class CommentForm extends Component{
	constructor(){
		super()
		this.state = {isModalOpen:false}
		this.toggleModal = this.toggleModal.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	toggleModal(){
		this.setState({isModalOpen: !this.state.isModalOpen})
	}
	handleSubmit(values){
		console.log("Current state is: " + JSON.stringify(values))
		alert("Current state is: " + JSON.stringify(values))
		// event.preventDefault()
	}
	render(){
		return(
			<div>
				<Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-small">
				</span> Submit Comment</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="rating">Rating</Label>
								<Control.select model=".rating" name="rating" className="form-control">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Control.select>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author">Name</Label>
								<Control.text model=".author" name="author" className="form-control" placeholder="Jane Doe"
								validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}/>
								<Errors className="text-danger" model=".author" show="touched" 
								messages={{required: 'Required',minLength:'Must be greater than 2 characters',
								maxLength:'Must be 15 characters or less'}}/>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment">Comment</Label>
								<Control.textarea model=".comment" name="comment" rows="6" className="form-control"/>
							</Row>
							<Button type="submit" value="submit" color="primary">Submit</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		)
	}
	
}	
const Dishdetail = (props) => {
	return (		
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
					<RenderComments comments={props.comments} />					
				</div>				
			</div>
		</div>
	)
}

export default Dishdetail