-- 测试 userid=11 的 Latest Activities 功能
-- 这个脚本创建最少必要的数据来测试活动功能

-- 创建 userid=11 用户
INSERT INTO users (username, email, password, name, coverPic, profilePic, city, website) VALUES
('kevin_test', 'kevin.test@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Kevin Test', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'Test City', NULL);

-- Kevin 关注前5个用户
INSERT INTO relationships (followerUserId, followedUserId, createdAt) VALUES
(11, 1, NOW() - INTERVAL 5 DAY),
(11, 2, NOW() - INTERVAL 4 DAY),
(11, 3, NOW() - INTERVAL 3 DAY),
(11, 4, NOW() - INTERVAL 2 DAY),
(11, 5, NOW() - INTERVAL 1 DAY);

-- Kevin 关注的用户发布新帖子（这些会在 Latest Activities 中显示）
INSERT INTO posts (`desc`, img, userId, createdAt) VALUES
('Kevin will see this post in activities! 🎉', 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', 1, NOW() - INTERVAL 2 HOUR),
('Another activity post for Kevin 📱', 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', 2, NOW() - INTERVAL 1 HOUR),
('Latest post from Mike 💻', 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', 3, NOW() - INTERVAL 30 MINUTE),
('Sarah\'s new update 🎨', NULL, 4, NOW() - INTERVAL 15 MINUTE),
('Alex just posted this! 📚', 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg', 5, NOW() - INTERVAL 5 MINUTE);

-- Kevin 关注的用户建立新的关注关系（这些也会在 Latest Activities 中显示）
INSERT INTO relationships (followerUserId, followedUserId, createdAt) VALUES
(1, 6, NOW() - INTERVAL 3 HOUR),  -- John follows Emma (Kevin follows John, so this shows up)
(2, 7, NOW() - INTERVAL 2 HOUR),  -- Jane follows David (Kevin follows Jane, so this shows up)
(3, 8, NOW() - INTERVAL 1 HOUR),  -- Mike follows Lisa (Kevin follows Mike, so this shows up)
(4, 9, NOW() - INTERVAL 30 MINUTE), -- Sarah follows Tom (Kevin follows Sarah, so this shows up)
(5, 10, NOW() - INTERVAL 10 MINUTE); -- Alex follows Anna (Kevin follows Alex, so this shows up)

-- 验证查询 - 模拟 getLatestActivities 的查询
SELECT 'Latest Activities for Kevin (userid=11):' as info;

SELECT 
  activity_type,
  user_name,
  activity_description,
  activity_time
FROM (
  (
    SELECT 
      'post' as activity_type,
      p.id as activity_id,
      u.id as user_id,
      u.name as user_name,
      u.profilePic as user_profile_pic,
      'created a new post' as activity_description,
      p.createdAt as activity_time
    FROM posts p
    INNER JOIN users u ON p.userId = u.id
    INNER JOIN relationships r ON r.followedUserId = u.id
    WHERE r.followerUserId = 11
  )
  UNION ALL
  (
    SELECT 
      'relationship' as activity_type,
      r.id as activity_id,
      u.id as user_id,
      u.name as user_name,
      u.profilePic as user_profile_pic,
      CONCAT('started following ', u2.name) as activity_description,
      r.createdAt as activity_time
    FROM relationships r
    INNER JOIN users u ON r.followerUserId = u.id
    INNER JOIN users u2 ON r.followedUserId = u2.id
    INNER JOIN relationships r2 ON r2.followedUserId = u.id
    WHERE r2.followerUserId = 11
    AND r.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
  )
) activities
ORDER BY activity_time DESC
LIMIT 10;