
CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company_id CHAR(36) NULL DEFAULT NULL,
    password_hash VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL DEFAULT NULL,
    role varchar(30) DEFAULT NULL,
    is_active BOOLEAN DEFAULT 1,
    UNIQUE (email)
);

CREATE TABLE company (
    company_id CHAR(36) PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    size VARCHAR(50) NOT NULL,
    type VARCHAR(36) NOT NULL,
    industry VARCHAR(36) NOT NULL
);

CREATE TABLE connection_invite (
    xid CHAR(36) PRIMARY KEY,
    company_id VARCHAR(30) NOT NULL,
    request_company_id VARCHAR(30) NOT NULL,
    status_internal_name VARCHAR(30) NOT NULL
);

CREATE TABLE status (
    status_id CHAR(36) PRIMARY KEY,
    status_name VARCHAR(30) NOT NULL,
    internal_name VARCHAR(30) NOT NULL
);

CREATE TABLE types (
    type_id CHAR(36) PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL,
    internal_name VARCHAR(30) NOT NULL
);
CREATE TABLE industries (
    industry_id CHAR(36) PRIMARY KEY,
    industry_name VARCHAR(30) NOT NULL,
    internal_name VARCHAR(30) NOT NULL
);

CREATE TABLE company_size (
    size_id CHAR(36) PRIMARY KEY,
    size_category VARCHAR(50) NOT NULL,
    internal_name VARCHAR(30) NOT NULL
);

INSERT INTO users (user_id, first_name, last_name, email, role, company_id, password_hash, registration_date, last_login, is_active)
VALUES
    ('1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6', 'john','doe', 'john@example.com', 'Admin', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5', '$2b$10$VHq94lDquUZHnIhRXF3Wku0boXCvGdfuGwA8KXs3nuPjC8bg/Zx.W', '2024-01-23 12:34:56', '2024-01-24 09:12:34', 1),
    ('2b3c4d5e6f7g8h9i0j1k2l3m4n5o6a', 'jane' ,'smith', 'jane@example.com', 'Admin', 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5', '$2b$10$VHq94lDquUZHnIhRXF3Wku0boXCvGdfuGwA8KXs3nuPjC8bg/Zx.W', '2024-01-23 08:45:21', '2024-01-23 15:30:45', 1);

INSERT INTO status (status_id, status_name, internal_name)
    VALUES 
        ('550e8400-e29b-41d4-a716-446655440006', 'Sent Request', 'SentRequest'),
        ('550e8400-e29b-41d4-a716-446655440002', 'Pending Approval', 'Pending Approval'),
        ('550e8400-e29b-41d4-a716-446655440007', 'Accepted', 'Accepted'),
        ('550e8400-e29b-41d4-a716-446655440008', 'Rejected', 'Rejected'),
        ('550e8400-e29b-41d4-a716-446655440009', 'Blocked', 'Blocked');

INSERT INTO types (type_id, type_name, internal_name)
VALUES 
    ('550e8400-e29b-41d4-a716-446655440000', 'Public Company', 'Public'),
    ('550e8400-e29b-41d4-a716-446655440001', 'Private Company', 'Private'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Nonprofit Organization', 'Nonprofit'),
    ('550e8400-e29b-41d4-a716-446655440003', 'Government Agency', 'Government'),
    ('550e8400-e29b-41d4-a716-446655440004', 'Startup', 'Startup'),
    ('550e8400-e29b-41d4-a716-446655440005', 'SME (Small and Medium-sized Enterprise)', 'SME'),
    ('550e8400-e29b-41d4-a716-446655440006', 'Multinational Corporation', 'Multinational'),
    ('550e8400-e29b-41d4-a716-446655440007', 'Limited Liability Company (LLC)', 'LLC'),
    ('550e8400-e29b-41d4-a716-446655440008', 'Partnership', 'Partnership'),
    ('550e8400-e29b-41d4-a716-446655440009', 'Sole Proprietorship', 'Sole Proprietorship'),
    ('550e8400-e29b-41d4-a716-446655440010', 'Cooperative', 'Coop'),
    ('550e8400-e29b-41d4-a716-446655440011', 'Professional Corporation', 'Prof Corp'),
    ('550e8400-e29b-41d4-a716-446655440012', 'C Corporation', 'C Corp'),
    ('550e8400-e29b-41d4-a716-446655440013', 'B Corporation', 'B Corp');

    
    INSERT INTO industries (industry_id, industry_name, internal_name)
    VALUES 
        ('550e8400-e29b-41d4-a716-446655440000', 'Technology', 'Tech'),
        ('550e8400-e29b-41d4-a716-446655440001', 'Healthcare', 'Health'),
        ('550e8400-e29b-41d4-a716-446655440002', 'Finance', 'Finance'),
        ('550e8400-e29b-41d4-a716-446655440003', 'Manufacturing', 'Manufacturing'),
        ('550e8400-e29b-41d4-a716-446655440004', 'Retail', 'Retail'),
        ('550e8400-e29b-41d4-a716-446655440005', 'Education', 'Education'),
        ('550e8400-e29b-41d4-a716-446655440006', 'Hospitality', 'Hospitality'),
        ('550e8400-e29b-41d4-a716-446655440007', 'Transportation', 'Transport'),
        ('550e8400-e29b-41d4-a716-446655440008', 'Energy', 'Energy'),
        ('550e8400-e29b-41d4-a716-446655440009', 'Telecommunications', 'Telecom'),
        ('550e8400-e29b-41d4-a716-446655440010', 'Agriculture', 'Agri'),
        ('550e8400-e29b-41d4-a716-446655440011', 'Entertainment', 'Entertainment'),
        ('550e8400-e29b-41d4-a716-446655440012', 'Biotechnology', 'Biotech'),
        ('550e8400-e29b-41d4-a716-446655440013', 'Aerospace', 'Aerospace'),
        ('550e8400-e29b-41d4-a716-446655440014', 'Automotive', 'Automotive'),
        ('550e8400-e29b-41d4-a716-446655440015', 'Pharmaceutical', 'Pharma');
        
    INSERT INTO company_size (size_id, size_category, internal_name)
    VALUES 
        ('550e8400-e29b-41d4-a716-446655440000', 'Small', 'Small'),
        ('550e8400-e29b-41d4-a716-446655440001', 'Medium', 'Medium'),
        ('550e8400-e29b-41d4-a716-446655440002', 'Large', 'Large'),
        ('550e8400-e29b-41d4-a716-446655440003', 'Enterprise', 'Enterprise'),
        ('550e8400-e29b-41d4-a716-446655440004', 'Startup', 'Startup'),
        ('550e8400-e29b-41d4-a716-446655440005', 'SME (Small and Medium-sized Enterprise)', 'SME'),
        ('550e8400-e29b-41d4-a716-446655440006', 'Microenterprise', 'Microenterprise'),
        ('550e8400-e29b-41d4-a716-446655440007', 'Very Small', 'Very Small'),
        ('550e8400-e29b-41d4-a716-446655440008', 'Large Enterprise', 'Large Enterprise'),
        ('550e8400-e29b-41d4-a716-446655440009', 'Medium-sized Business', 'Medium-sized'),
        ('550e8400-e29b-41d4-a716-446655440010', 'Global Corporation', 'Global Corp');

