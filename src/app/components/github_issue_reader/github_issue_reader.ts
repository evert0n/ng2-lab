import {Inject, Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Github} from '../../services/github';

@Component({
	moduleId: module.id, // CommonJS standard
	selector: 'github-issue-reader',
	templateUrl: './github_issue_reader.html',
	styleUrls: ['./github_issue_reader.css'],
	directives: [
		CORE_DIRECTIVES,
		ROUTER_DIRECTIVES
	]
})

export class GithubIssueReader {

	repositories = [];

	constructor(@Inject(Github) github:Github) {

		github.searchRepo().subscribe(repos => this.repositories = repos);

	}

}
