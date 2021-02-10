import Reat, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";

class Dishdetail extends Component {

	getDateString = (date) => {
		let commentDate = new Date(date);
		let monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 
		"Aug", "Sep", "Oct", "Nov", "Dec"];
		let month = monthsArray[commentDate.getMonth()];
		let day = commentDate.getDate();
		let year = commentDate.getFullYear();
		return month + " " + day + ", " + year;
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
		}else{
			return <div></div>;
		}
	}
	
	renderComments = (dish) => {		
		if (dish != null){
			const commentList = (
				<ul className="list-unstyled">
					{ dish.comments.map((item) =>				
						<li key={item.id}>
							{item.comment}
							-- {item.author}, {this.getDateString(item.date)}
						</li>					
					)}
				</ul>
			);
			return (
				<div className="col-12 col-md-5">
					<h4>Comments</h4>
					{commentList}					
				</div>
			);
		}
		else return <div></div>
		
	}
	
	render(){
		var dish = this.props.dish;
		
		return (
			<div className="row">
				{this.renderDish(dish)} 
				{this.renderComments(dish)}
			</div>
		);
	}
}

export default Dishdetail;