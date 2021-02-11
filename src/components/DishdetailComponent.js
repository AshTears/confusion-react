import Reat, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";

class Dishdetail extends Component {

	getDateString = (date) => {
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
		}).format(new Date(Date.parse(date)));
	}
	
	renderDish = (dish) => { 
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
	
	renderComments = (dish) => {		
		if (dish != null){
			const commentList = dish.comments.map(item =>
				<li key={item.id}>
					<p>{item.comment}</p>
					<p>-- {item.author}, {this.getDateString(item.date)}</p>
				</li>				
			);
			return (
				<div className="col-12 col-md-5">
					<h4>Comments</h4>
					<ul className="list-unstyled">
						{commentList}
					</ul>					
				</div>
			);
		}
		else return <div></div>		
	}
	
	render(){
		var dish = this.props.dish;
		
		return (
			<div className="container">
				<div className="row">
					{this.renderDish(dish)} 
					{this.renderComments(dish)}
				</div>
			</div>
		);
	}
}

export default Dishdetail;