import React, { Component } from "react";
import NavBar from '../nav.jsx';

//displaying the announce
class Announces extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		//generating and display rating as stars
		const elem = Math.floor(this.props.announce.rating);
		const stars = [];
		let count = 0;
		for (let i = 0; i < 5; i++) {
			if (count !== elem) {
				stars.push(<span key={i} className="fa fa-star checked" style={{ color: 'gold' }}></span>);
				count++;
			} else {
				stars.push(<span className="fa fa-star" style={{ color: 'lightGray' }}></span>)
			}
		}

		return (
			<div>
				<NavBar />
				<div className=''>
					<main className=" list pl0 mt0  center pa4 " style={{ position: 'absolute', top: '25%', right: '50%', transform: 'translate(50%, -7.5%)' }}>
						<div className="flex justify-center lh-copy pa3 ph0-l ba b--black-10 pa3 w-100">
							<div className='br b--black-50'>
								<img
									className="w2 h2 w4-ns h4-ns br2"
									src="http://tachyons.io/img/avatar-jasonli.jpg"
								/>
								<span className="f2 db black-70 pa2">
									{this.props.announce.firstName} {this.props.announce.lastName}
								</span>
							</div>
							<div className=" pl3 center ph5 ">
								<span className="f1 db black-70 pa2">
									{this.props.announce.categorie}
								</span>
								<span className='f4 db black-70 pa2'>
									{this.props.announce.region}
								</span>
								<span className='f5 db black-70 pa2'>
									{this.props.announce.description}
								</span>
							</div>
							<div className='fr'>
								<h3>
									{this.props.announce.price} DT
		            </h3>
								{stars}
							</div>
						</div>
					</main>
				</div>
			</div>
		)

	}
}


export default Announces;

