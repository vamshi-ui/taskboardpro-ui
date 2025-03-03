
export interface Tag {
    _id: string;
    tagName: string;
    description: string;
    __v: number;
  }
  
  export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    emailId: string;
    password: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface Task {
    _id: string;
    taskName: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    status: "pending" | "in-progress" | "completed";
    category: string;
    tags: Tag[];
    description: string;
    userId: User;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  