-- 社交网络应用假数据 SQL 脚本
-- 包含 users, posts, comments, likes, relationships, stories 表的测试数据

-- 插入用户数据 (10个用户)
INSERT INTO users (username, email, password, name, coverPic, profilePic, city, website) VALUES
('john_doe', 'john@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John Doe', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'New York', 'https://johndoe.com'),
('jane_smith', 'jane@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane Smith', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'Los Angeles', 'https://janesmith.com'),
('mike_wilson', 'mike@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mike Wilson', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'Chicago', NULL),
('sarah_brown', 'sarah@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah Brown', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'Miami', 'https://sarahbrown.com'),
('alex_johnson', 'alex@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Alex Johnson', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'Seattle', NULL),
('emma_davis', 'emma@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Emma Davis', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'Boston', 'https://emmadavis.com'),
('david_lee', 'david@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'David Lee', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'San Francisco', NULL),
('lisa_garcia', 'lisa@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lisa Garcia', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'Austin', 'https://lisagarcia.com'),
('tom_martinez', 'tom@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Tom Martinez', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'Denver', NULL),
('anna_taylor', 'anna@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Anna Taylor', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'Portland', 'https://annataylor.com');

-- 插入帖子数据 (10个帖子)
INSERT INTO posts (`desc`, img, userId, createdAt) VALUES
('Beautiful sunset at the beach! 🌅', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 1, '2024-01-15 18:30:00'),
('Just finished my morning workout 💪', 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg', 2, '2024-01-15 08:15:00'),
('Delicious homemade pasta for dinner tonight! 🍝', 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', 3, '2024-01-14 19:45:00'),
('Exploring the city with friends today', NULL, 4, '2024-01-14 14:20:00'),
('New book recommendation: "The Art of Programming" 📚', 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg', 5, '2024-01-13 16:10:00'),
('Coffee and coding session ☕️', 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', 6, '2024-01-13 10:30:00'),
('Weekend hiking adventure in the mountains! 🏔️', 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg', 7, '2024-01-12 15:45:00'),
('Trying out a new recipe today', NULL, 8, '2024-01-12 12:00:00'),
('Amazing concert last night! 🎵', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg', 9, '2024-01-11 23:30:00'),
('Working on a new project. Excited to share soon!', NULL, 10, '2024-01-11 09:15:00');

-- 插入关注关系数据 (10个关系)
INSERT INTO relationships (followerUserId, followedUserId) VALUES
(1, 2), -- John follows Jane
(1, 3), -- John follows Mike
(2, 1), -- Jane follows John
(2, 4), -- Jane follows Sarah
(3, 1), -- Mike follows John
(3, 5), -- Mike follows Alex
(4, 2), -- Sarah follows Jane
(4, 6), -- Sarah follows Emma
(5, 3), -- Alex follows Mike
(6, 4); -- Emma follows Sarah

-- 插入评论数据 (10个评论)
INSERT INTO comments (`desc`, createdAt, userId, postId) VALUES
('Absolutely stunning! 😍', '2024-01-15 18:35:00', 2, 1),
('Great job on the workout! Keep it up!', '2024-01-15 08:20:00', 1, 2),
('That looks delicious! Can you share the recipe?', '2024-01-14 19:50:00', 4, 3),
('Sounds like a fun day!', '2024-01-14 14:25:00', 5, 4),
('Thanks for the recommendation! Adding to my reading list', '2024-01-13 16:15:00', 6, 5),
('Perfect combination! ☕️💻', '2024-01-13 10:35:00', 7, 6),
('Wow, what a view! Where is this?', '2024-01-12 15:50:00', 8, 7),
('Good luck with the recipe!', '2024-01-12 12:05:00', 9, 8),
('Wish I was there! Who was performing?', '2024-01-11 23:35:00', 10, 9),
('Can\'t wait to see what you\'re working on!', '2024-01-11 09:20:00', 1, 10);

-- 插入点赞数据 (10个点赞)
INSERT INTO likes (userId, postId) VALUES
(2, 1), -- Jane likes John's sunset post
(3, 1), -- Mike likes John's sunset post
(1, 2), -- John likes Jane's workout post
(4, 2), -- Sarah likes Jane's workout post
(5, 3), -- Alex likes Mike's pasta post
(6, 4), -- Emma likes Sarah's city exploration post
(7, 5), -- David likes Alex's book recommendation
(8, 6), -- Lisa likes Emma's coffee post
(9, 7), -- Tom likes David's hiking post
(10, 8); -- Anna likes Lisa's recipe post

-- 插入故事数据 (10个故事)
INSERT INTO stories (img, createdAt, userId) VALUES
('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', '2024-01-15 20:00:00', 1),
('https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg', '2024-01-15 19:30:00', 2),
('https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', '2024-01-15 18:45:00', 3),
('https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', '2024-01-15 17:20:00', 4),
('https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg', '2024-01-15 16:10:00', 5),
('https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg', '2024-01-15 15:30:00', 6),
('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg', '2024-01-15 14:45:00', 7),
('https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', '2024-01-15 13:20:00', 8),
('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', '2024-01-15 12:15:00', 9),
('https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg', '2024-01-15 11:30:00', 10);

-- 查询验证数据
SELECT 'Users created:' as info, COUNT(*) as count FROM users;
SELECT 'Posts created:' as info, COUNT(*) as count FROM posts;
SELECT 'Comments created:' as info, COUNT(*) as count FROM comments;
SELECT 'Likes created:' as info, COUNT(*) as count FROM likes;
SELECT 'Relationships created:' as info, COUNT(*) as count FROM relationships;
SELECT 'Stories created:' as info, COUNT(*) as count FROM stories;