import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()

export class Github {

	http: Http;

	BASE_URL: string;

	constructor(http: Http) {

		this.http = http;

		this.BASE_URL = 'https://api.github.com';

	}

	searchRepo(options?: any) {
		return this.http.get(this.BASE_URL + '/search/repositories?q=angular&sort=stars&order=desc')
			.map(response => response.json());
	}

	getRepository(repo: string, options?:any) {
		let url = this.BASE_URL + '/repos/' + repo;
		return this.http.get(url).map(response => response.json());
	}

	getIssues(repo:string, options?:any) {
		let url = this.BASE_URL + '/repos/' + repo + '/issues';
		return this.http.get(url, options).map(response => response.json());
	}

	getIssue(repo:string, issueId:number) {
		let url = this.BASE_URL + '/repos/' + repo + '/issues/' + issueId;
		let options = {
			headers: {
				'Accept': 'application/vnd.github.v3.html+json'
			}
		}
		return this.http.get(url, options).map(response => response.json());
	}

	getIssueComments(repo:string, issueId:number) {
		let url = this.BASE_URL + '/repos/' + repo + '/issues/' + issueId + '/comments';
		let options = {
			headers: {
				'Accept': 'application/vnd.github.v3.html+json'
			}
		}
		return this.http.get(url, options).map(response => response.json());
	}
}
