import {Inject, Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {RouteParams} from 'angular2/router';

import {Github} from '../../services/github';

@Component({
	moduleId: module.id, // CommonJS standard
	selector: 'github-issue-reader-repo',
	templateUrl: './github_issue_reader_repo.html',
	styleUrls: ['./github_issue_reader_repo.css'],
	directives: [
		CORE_DIRECTIVES,
		ROUTER_DIRECTIVES
	]
})

export class GithubIssueReaderRepo {

  // Holds a list of issues
  private issues:any;

  // Holds the current select issue
  private issue:string;
	private issueComments:any;

  // Holds the current repository
  private repository:any;


  github: Github;

  constructor(routeParams:RouteParams, github:Github) {

    let repo = routeParams.get('org') + '/' + routeParams.get('repo');

    this.github = github;

    github.getRepository(repo)
      .subscribe(repository => this.repository = repository);

    github.getIssues(repo)
      .subscribe(issues => this.issues = issues);

  }

  showIssue(issue) {

		this.issue = {};
		this.issueComments = [];

    this.github.getIssue(this.repository.full_name, issue.number)
      .subscribe(issue => this.issue = issue);

    this.github.getIssueComments(this.repository.full_name, issue.number)
      .subscribe(comments => this.issueComments = comments);

	}

}
