import API from '../API';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

class Summary extends HTMLElement{
	constructor(){
		super();
		this.shadow = this.attachShadow({mode: 'open'});
		this.styles = `
		<style>
			* {
				color: var(--color-text);
				border: 1px solid var(--color-border);
			}
			:host{
				display: flex;
				justify-content: space-evenly;
				width: 100%;
				border: 1px solid var(--color-border);
			}
		</style>
		`;
	}

	connectedCallback(){
		this.data = new API().getData().then(data => {
			
			this.render(data);
		})
	}
	render(data){
		this.shadow.innerHTML = `
		${this.styles}
			<div class="chart">
				<canvas id="doughnut-chart"></canvas>
			</div>
			<div class="detail">
				<div class="detail-header">
					<h1>Summary Detail</h1>
					<table>
						<tr>
							<td>
								Confirmed
							</td>
							<td>
								${data.confirmed.value}
							</td>
						</tr>
						<tr>
							<td>
								Recovered
							</td>
							<td>
								${data.recovered.value}
							</td>
						</tr>
						<tr>
							<td>
								Deaths
							</td>
							<td>
								${data.deaths.value}
							</td>
						</tr>
					</table>
				</div>
			</div>
		`;
	}
}

customElements.define('main-summary', Summary);
export default Summary;