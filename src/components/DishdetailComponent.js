import React from "react"
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap"

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
				{ RenderDish(props) } 
				{ RenderComments(props) }
			</div>
		</div>
	)
}

export default Dishdetail