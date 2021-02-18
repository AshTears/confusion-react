import React from "react"
import { Card, CardImg, CardText, CardBody, CardTitle,
Breadcrumb, BreadcrumbItem} from "reactstrap"
import {Link} from "react-router-dom"

function GetDateString(date){
	/*
	let commentDate = new Date(date);
	let monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 
		"Aug", "Sep", "Oct", "Nov", "Dec"];
	let month = monthsArray[commentDate.getMonth()];
	let day = commentDate.getDate();
	let year = commentDate.getFullYear();
	return month + " " + day + ", " + year;
	*/
	return new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	}).format(new Date(Date.parse(date)))
}
	
function RenderDish({dish}){ 
	if (dish != null){
		return(
			<div key={dish.id} className="col-12 col-md-5 m-1">
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
			<div className="col-12 col-md-5">
				<h4>Comments</h4>
				<ul className="list-unstyled">{commentList}</ul>					
			</div>
		)
	}
	else return <div></div>		
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