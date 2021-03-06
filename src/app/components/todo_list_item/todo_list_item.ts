import {
	Inject,
	Component,
	ViewEncapsulation,
	Input
} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {Chores, Chore} from '../../services';
import {Glyph} from '../glyph/glyph';
import {Checkbox} from '../checkbox/checkbox';

@Component({
	moduleId: module.id, // CommonJS standard
	selector: '[todoListItem]',
	encapsulation: ViewEncapsulation.Emulated, // ViewEncapsulation.Emulated, ViewEncapsulation.Native, ViewEncapsulation.None (default)
	templateUrl: './todo_list_item.html',
	styleUrls: [
		'./todo_list_item.css'
	],
	directives: [
		CORE_DIRECTIVES,
		FORM_DIRECTIVES,
		Glyph,
		Checkbox
	]
})

export class TodoListItem {
	@Input('todoListItem') model: Chore;
	isEditMode: boolean = false;
	private cs: Chores;

	constructor(@Inject(Chores) csp: Promise<Chores>) {
		csp.then((cs) => this.cs = cs);
	}

	remove(event) {
		event.preventDefault();
		this.cs.remove(this.model);
	}
	toggleEditMode(event, input) {
		event.preventDefault();
		this.isEditMode = !this.isEditMode;
		input.setSelectionRange(0, input.value.length);
	}

	onStatusChange(value) {
		this.cs.update(this.model, <Chore>{
			completed: value
		});
	}
	onNameChange(value) {
		this.cs.update(this.model, <Chore>{
			name: value
		});
	}
}