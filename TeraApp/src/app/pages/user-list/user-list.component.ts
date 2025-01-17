import { Component } from '@angular/core';
import { UserMaster } from '../../../../Models/type';
import { UserService } from '../../Services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: UserMaster[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  error: string | null = null;

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load all users
  loadUsers(): void {
    console.log('Users Load Method Called');
    this.userService.getAllUsers().subscribe({
      next: (users: UserMaster[]) => {
        console.log(users);
        this.users = users;
      },
      error: (err) => {
        console.log(err);
        this.error = 'Failed To Load User Master Data.';
      },
    });
  }

  addUser(): void {
    this.router.navigate(['layout/UserAE']); 
  }

  editUser(id: number | undefined): void {
    if (id) {
      this.router.navigate(['layout/UserAE', id]); // Navigate to user form with the user ID for editing
    } else {
      console.error('Invalid user ID');
    }
  }

  deleteUser(id: number | undefined): void {
    if (id) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers(); // Reload the users list after deletion
      });
    } else {
      console.error('Invalid user ID');
    }
  }
}
