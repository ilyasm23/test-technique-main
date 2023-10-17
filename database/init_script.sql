-- Drop the 'todos' table if it exists
DROP TABLE IF EXISTS todos;

-- Create the 'todos' table
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(256) NOT NULL,
    priority VARCHAR(10) NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    execution_date TIMESTAMP WITH TIME ZONE
);

-- Insert sample todos
INSERT INTO todos (title, content, priority, execution_date)
VALUES
    ('Finish project report', 'Complete the project report for the upcoming deadline.', 'high', '2023-10-20T08:00:00Z'),
    ('Buy groceries', 'Purchase groceries for the week including fruits, vegetables, and dairy products.', 'medium', NULL),
    ('Call John', 'Schedule a call with John to discuss the upcoming meeting.', 'low', '2023-10-18T15:30:00Z'),
    ('Read a book', 'Spend an hour reading a new novel.', 'medium', NULL),
    ('Attend team meeting', 'Participate in the weekly team meeting at 2:00 PM.', 'high', '2023-10-19T14:00:00Z'),
    ('Go for a run', 'Get some exercise by going for a 5 km run at the park.', 'medium', NULL);

