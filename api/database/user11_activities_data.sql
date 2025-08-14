-- 为 userid=11 创建 Latest Activities 相关假数据
-- 包含用户创建、关注关系、帖子和活动数据

-- 首先创建 userid=11 的用户
INSERT INTO users (username, email, password, name, coverPic, profilePic, city, website) VALUES
('kevin_chen', 'kevin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Kevin Chen', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'Vancouver', 'https://kevinchen.dev');

-- 让 userid=11 关注一些用户（这样他就能看到这些用户的活动）
INSERT INTO relationships (followerUserId, followedUserId, createdAt) VALUES
(11, 1, '2024-01-10 10:00:00'), -- Kevin follows John
(11, 2, '2024-01-10 10:05:00'), -- Kevin follows Jane
(11, 3, '2024-01-10 10:10:00'), -- Kevin follows Mike
(11, 4, '2024-01-10 10:15:00'), -- Kevin follows Sarah
(11, 5, '2024-01-10 10:20:00'), -- Kevin follows Alex
(11, 6, '2024-01-10 10:25:00'); -- Kevin follows Emma

-- 让一些用户也关注 userid=11
INSERT INTO relationships (followerUserId, followedUserId, createdAt) VALUES
(1, 11, '2024-01-16 09:00:00'), -- John follows Kevin
(2, 11, '2024-01-16 09:30:00'), -- Jane follows Kevin
(7, 11, '2024-01-16 10:00:00'); -- David follows Kevin

-- 为 Kevin 关注的用户创建一些新的帖子（这些会出现在 Latest Activities 中）
INSERT INTO posts (`desc`, img, userId, createdAt) VALUES
-- John 的新帖子
('Starting a new photography project! 📸', 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg', 1, '2024-01-16 14:30:00'),
('Morning coffee with a great view ☕️', 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', 1, '2024-01-16 08:15:00'),

-- Jane 的新帖子
('Yoga session in the park 🧘‍♀️', 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg', 2, '2024-01-16 16:45:00'),
('Healthy smoothie recipe! 🥤', 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg', 2, '2024-01-16 12:20:00'),

-- Mike 的新帖子
('Weekend coding marathon! 💻', 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', 3, '2024-01-16 18:00:00'),
('New restaurant discovery 🍕', 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', 3, '2024-01-16 13:30:00'),

-- Sarah 的新帖子
('Art gallery visit today! 🎨', 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg', 4, '2024-01-16 15:15:00'),

-- Alex 的新帖子
('Reading by the fireplace 📖', 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg', 5, '2024-01-16 19:30:00'),

-- Emma 的新帖子
('Late night coding session 🌙', 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', 6, '2024-01-16 22:00:00');

-- 创建一些新的关注关系（Kevin 关注的人的新关注活动）
INSERT INTO relationships (followerUserId, followedUserId, createdAt) VALUES
-- John 开始关注新用户
(1, 7, '2024-01-16 11:00:00'), -- John follows David
(1, 8, '2024-01-16 11:30:00'), -- John follows Lisa

-- Jane 开始关注新用户
(2, 9, '2024-01-16 13:00:00'), -- Jane follows Tom
(2, 10, '2024-01-16 13:45:00'), -- Jane follows Anna

-- Mike 开始关注新用户
(3, 6, '2024-01-16 14:00:00'), -- Mike follows Emma
(3, 7, '2024-01-16 14:30:00'), -- Mike follows David

-- Sarah 开始关注新用户
(4, 8, '2024-01-16 16:00:00'), -- Sarah follows Lisa
(4, 9, '2024-01-16 16:30:00'), -- Sarah follows Tom

-- Alex 开始关注新用户
(5, 10, '2024-01-16 17:00:00'), -- Alex follows Anna

-- Emma 开始关注新用户
(6, 1, '2024-01-16 20:00:00'), -- Emma follows John
(6, 2, '2024-01-16 20:30:00'); -- Emma follows Jane

-- 为新帖子添加一些评论和点赞
INSERT INTO comments (`desc`, createdAt, userId, postId) VALUES
('Love your photography style! 📸', '2024-01-16 14:35:00', 11, 11),
('Great shot! 👍', '2024-01-16 08:20:00', 11, 12),
('Yoga is so relaxing! 🧘‍♀️', '2024-01-16 16:50:00', 11, 13),
('Recipe please! 😍', '2024-01-16 12:25:00', 11, 14),
('Happy coding! 💻', '2024-01-16 18:05:00', 11, 15),
('Looks delicious! 🍕', '2024-01-16 13:35:00', 11, 16),
('Art is beautiful! 🎨', '2024-01-16 15:20:00', 11, 17),
('Perfect reading spot! 📖', '2024-01-16 19:35:00', 11, 18),
('Productive night! 🌙', '2024-01-16 22:05:00', 11, 19);

INSERT INTO likes (userId, postId) VALUES
(11, 11), -- Kevin likes John's photography post
(11, 12), -- Kevin likes John's coffee post
(11, 13), -- Kevin likes Jane's yoga post
(11, 14), -- Kevin likes Jane's smoothie post
(11, 15), -- Kevin likes Mike's coding post
(11, 16), -- Kevin likes Mike's restaurant post
(11, 17), -- Kevin likes Sarah's art gallery post
(11, 18), -- Kevin likes Alex's reading post
(11, 19); -- Kevin likes Emma's coding post

-- 为 Kevin 自己创建一些帖子
INSERT INTO posts (`desc`, img, userId, createdAt) VALUES
('New year, new goals! 🎯', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 11, '2024-01-16 10:00:00'),
('Learning React Native today 📱', 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', 11, '2024-01-16 11:30:00'),
('Beautiful sunset from my balcony 🌅', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 11, '2024-01-16 18:45:00');

-- 为 Kevin 的帖子添加一些互动
INSERT INTO comments (`desc`, createdAt, userId, postId) VALUES
('Great goals! You got this! 💪', '2024-01-16 10:05:00', 1, 20),
('React Native is awesome! 📱', '2024-01-16 11:35:00', 2, 21),
('Stunning view! 😍', '2024-01-16 18:50:00', 3, 22);

INSERT INTO likes (userId, postId) VALUES
(1, 20), -- John likes Kevin's goals post
(2, 20), -- Jane likes Kevin's goals post
(3, 20), -- Mike likes Kevin's goals post
(1, 21), -- John likes Kevin's React Native post
(2, 21), -- Jane likes Kevin's React Native post
(4, 21), -- Sarah likes Kevin's React Native post
(1, 22), -- John likes Kevin's sunset post
(2, 22), -- Jane likes Kevin's sunset post
(3, 22), -- Mike likes Kevin's sunset post
(4, 22), -- Sarah likes Kevin's sunset post
(5, 22); -- Alex likes Kevin's sunset post

-- 创建一些故事
INSERT INTO stories (img, createdAt, userId) VALUES
('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', '2024-01-16 21:00:00', 11),
('https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', '2024-01-16 20:30:00', 11);

-- 验证数据
SELECT 'Kevin Chen user created' as info, COUNT(*) as count FROM users WHERE id = 11;
SELECT 'Kevin follows count' as info, COUNT(*) as count FROM relationships WHERE followerUserId = 11;
SELECT 'Kevin followers count' as info, COUNT(*) as count FROM relationships WHERE followedUserId = 11;
SELECT 'Kevin posts count' as info, COUNT(*) as count FROM posts WHERE userId = 11;
SELECT 'Recent posts by followed users' as info, COUNT(*) as count FROM posts p 
INNER JOIN relationships r ON p.userId = r.followedUserId 
WHERE r.followerUserId = 11 AND p.createdAt > '2024-01-16 00:00:00';
SELECT 'Recent relationships by followed users' as info, COUNT(*) as count FROM relationships r1
INNER JOIN relationships r2 ON r1.followerUserId = r2.followedUserId
WHERE r2.followerUserId = 11 AND r1.createdAt > '2024-01-16 00:00:00';