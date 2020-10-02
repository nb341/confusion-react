import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
   constructor(props){
     super(props);
     this.state = {
         dish : null
     }
   }
  
   renderDish(dish) {
    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else 
        return(
            <div></div>
        );
}

renderComments(dish){
   if(dish!=null){
       let com = this.props.selected.comments;
       let val = [];
       const comments = com.map(c=>{
       val.push(<p>{c.comment}</p>);
       let d = new Date(c.date);
       let m = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"];
       let date = m[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
       val.push(<li key={c.id.toString()} className="m-1">-- {c.author+' , '+' '+date}</li>)
       });
       return(
           <div> 
              <h4>Comments</h4>
            <ul className="list-unstyled">
            {val}
                </ul>
              
           </div>
          
       )
   }
   else{
       return(<div></div>);
   }
}


   render(){
       
       return(
          <div className="row">
              <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selected)}
                  </div>
                  <div className="col-12 col-md-5 m-1">
                      {this.renderComments(this.props.selected)}
                </div>
          </div>
       );
   }
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