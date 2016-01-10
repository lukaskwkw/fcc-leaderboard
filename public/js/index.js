'use strict';

import  React from "react";
import  ReactDOM from "react-dom";
import  $ from "./jquery-1.11.3.min.js";

const [recentLink,allTimeLink] = ['http://fcctop100.herokuapp.com/api/fccusers/top/recent','http://fcctop100.herokuapp.com/api/fccusers/top/alltime']

class Table extends React.Component {
	constructor() {
		super();
		this.state = {'arr': [], 'alltimeArr' : [], 'rows': [], 'recentOrder': 0, 'alltimeOrder': 1}
		this.setRows = this.setRows.bind(this);
		this.sortRecent = this.sortRecent.bind(this);
		this.sortAlltime = this.sortAlltime.bind(this);
	}
	sortRecent() {
		var arr = [];
		if (this.state.recentOrder===0) {
			arr = this.state.arr.sort( (a,b) => a.recent-b.recent);
			this.setState({'recentOrder': 1});
		}
		else
		{
			arr = this.state.arr.sort( (a,b) => b.recent-a.recent);
			this.setState({'recentOrder': 0});
		}
		this.setState({'arr': arr});
		this.setRows(arr);
	}
	sortAlltime() {
		if (this.state.alltimeArr.length===0) return;
		var arr = [];
		if (this.state.alltimeOrder===0) {
			arr = this.state.alltimeArr.sort( (a,b) => a.alltime-b.alltime);
			this.setState({'alltimeOrder': 1});
		}
		else
		{
			arr = this.state.alltimeArr.sort( (a,b) => b.alltime-a.alltime);
			this.setState({'alltimeOrder': 0});
		}
		this.setState({'alltimeArr': arr});
		this.setRows(arr);
	}
	setRows(json){
			let rows = [];
			let row = null;
					for (let i = 0; i < json.length; i++) {
							row = <tr key={json[i].username}>
									<td>{i+1}</td>
									<td><img src={json[i].img} height="42" width="42" alt=""/>
										<a href={"http://www.freecodecamp.com/"+json[i].username} target="_blank">
											<span className="username">{json[i].username}</span>
										</a>
									</td>
									<td>{json[i].recent}</td>
									<td>{json[i].alltime}</td>
								</tr>;

							rows.push(row);
						}
			this.setState({'rows':rows});
	}
	componentDidMount() {
		$.getJSON(recentLink, json => {
			this.setState({'arr': json});
			this.setRows(json);
			$.getJSON(allTimeLink, json => {
				this.setState({'alltimeArr': json});
			});
		});										
	}
	render() {
		return (
		<div className="container">
			<table>
				<caption>Leaderboard</caption>
				<thead>
					<tr>
						<th>#</th>
						<th>Camper Name</th>
						<th onClick={this.sortRecent}>Points in past 30 days <i className="sort-arrow">{ (this.state.arr.length>0) ? (this.state.recentOrder) ? '↑' : '↓' : '' }</i></th>
						<th onClick={this.sortAlltime}>All time points <i className="sort-arrow">{ (this.state.alltimeArr.length>0) ? (this.state.alltimeOrder) ? '↑' : '↓' : ''}</i></th>
					</tr>
				</thead>
				<tbody>
						{this.state.rows}
				</tbody>
			</table>
		</div>	
	);
	}
}

ReactDOM.render(<Table/>,document.getElementById('content'));