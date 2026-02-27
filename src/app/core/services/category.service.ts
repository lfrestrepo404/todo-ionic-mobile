import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private categories: Category[] = [];

    constructor() {
        this.loadFromStorage();
    }

    getCategories() { return this.categories; }

    addCategory(name: string) {
        const newCat: Category = {
            id: Date.now().toString(),
            name: name,
            createdAt: Date.now() // <--- Agrega esta línea para quitar el error
        };
        this.categories.push(newCat);
        this.saveToStorage();
    }

    updateCategory(id: string, newName: string) {
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            this.categories[index].name = newName;
            this.saveToStorage();
        }
    }

    deleteCategory(id: string) {
        this.categories = this.categories.filter(c => c.id !== id);
        this.saveToStorage();
    }

    private saveToStorage() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }

    private loadFromStorage() {
        const saved = localStorage.getItem('categories');
        this.categories = saved ? JSON.parse(saved) : [];
    }
}