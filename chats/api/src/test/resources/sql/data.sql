INSERT INTO chats(user1, user2)
VALUES (0, 1), (1, 0), (2, 3);

INSERT INTO messages(of, near, text, chat_id, date)
VALUES (0, 1, 'Hie!', 1, '01/01/2024'), (1, 0, 'Ok, and you?', 1, '01/01/2024'),
(0, 1, 'Good', 1, '01/01/2024');