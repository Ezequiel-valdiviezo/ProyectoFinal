<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'avatar' => 'avatar.png',
            'role' => 'user',
        ]);
        User::factory()->create([
            'name' => 'Ezequiel',
            'email' => 'ezequiel@gmail.com',
            'avatar' => 'avatar1.png',
            'role' => 'user',
            'password' => 'ezequiel',
        ]);
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'avatar' => 'avatar1.png',
            'role' => 'admin',
            'password' => 'ezequiel',
        ]);
    }
}
