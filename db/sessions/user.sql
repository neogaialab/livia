-- @block Drop user tables

DROP TABLE "User";
DROP TABLE "OAuthAccount";
DROP TABLE "Session";

-- @block Delete all users

DELETE FROM "User";
DELETE FROM "Session";
DELETE FROM "OAuthAccount";

-- @block List all users

SELECT * FROM "User";

-- @block Insert sample user

INSERT INTO "User" (name, last_name, picture, email, created_at)
VALUES ('John', 'Doe', 'https://example.com/picture.jpg', 'john.doe@example.com', NOW());
