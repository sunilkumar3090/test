import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@app/_shared/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { User } from '@app/_state/users/users-store';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Store,  } from '@ngrx/store';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','actions'];
  dataSource: MatTableDataSource<User>;
  isLoading: boolean = true;
  expandedUser: User | null; // keep track of expanded user for toggling
  expandedElement:User | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private userService: UserService,private store: Store<User>) { 
  
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(users => {
      if (users.users.length) { 

      this.dataSource = new MatTableDataSource(users.users);
      console.log(users.users, 'fetch users');
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
      this.isLoading = false;
      }
    }, error => {
      console.error(error);
      this.isLoading = false;
    });
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleEdit(user: User) {
   
    user.editing = !user.editing;
    if (user.editing) {
      // Make a copy of the user to allow canceling changes
      user.editingUser = Object.assign({}, user);
    }
  }

  save(user: User) {
    // Simulate saving changes to a data source
    const uservalue = user;
    this.expandedElement=null;
    this.toggleEdit(user);
    this.updateUsers(user.id,user)
  }

  cancel(user: User) {
    this.expandedElement=null;
    Object.assign(user, user.editingUser);
    this.toggleEdit(user);
  }
  updateUsers(id:string,data:User){
    this.userService.updateUsers(id,data).subscribe(data => {
      console.log(data,'updated')
    }, error => {
      console.error(error);
      this.isLoading = false;
    });

  }

  

}