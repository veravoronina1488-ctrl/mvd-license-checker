CREATE DATABASE mvd_license_checker;

\c mvd_license_checker

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    license_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    patronymic VARCHAR(100),
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    license_status VARCHAR(50) DEFAULT 'active',
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    issued_by VARCHAR(255),
    place_of_residence VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE license_categories (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    category VARCHAR(10) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    restrictions VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(driver_id, category)
);

CREATE TABLE fines (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    fine_number VARCHAR(50) UNIQUE NOT NULL,
    violation_date DATE NOT NULL,
    violation_description TEXT NOT NULL,
    fine_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'unpaid',
    issued_date DATE NOT NULL,
    payment_deadline DATE,
    payment_date DATE,
    location VARCHAR(255),
    traffic_officer_name VARCHAR(255),
    article_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE violations (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    violation_type VARCHAR(100) NOT NULL,
    violation_date DATE NOT NULL,
    description TEXT,
    location VARCHAR(255),
    penalty_type VARCHAR(100),
    violation_status VARCHAR(50) DEFAULT 'recorded',
    traffic_officer_name VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    entity_type VARCHAR(50),
    entity_id INTEGER,
    action VARCHAR(50),
    changes JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_drivers_license_number ON drivers(license_number);
CREATE INDEX idx_drivers_created_at ON drivers(created_at);
CREATE INDEX idx_fines_driver_id ON fines(driver_id);
CREATE INDEX idx_fines_status ON fines(status);
CREATE INDEX idx_violations_driver_id ON violations(driver_id);
CREATE INDEX idx_violations_date ON violations(violation_date);

INSERT INTO users (email, password_hash, full_name, role, is_active) 
VALUES ('admin@mvd.kz', '$2b$10$PLACEHOLDER_HASH_HERE', 'Администратор', 'admin', true);

INSERT INTO drivers (license_number, first_name, last_name, patronymic, date_of_birth, gender, license_status, issue_date, expiry_date, issued_by, place_of_residence, phone_number, email)
VALUES 
('011023A000001', 'Нурлан', 'Сейдалиев', 'Қайратұлы', '1990-05-15', 'M', 'active', '2020-03-10', '2025-03-10', 'МВД Алматы', 'г. Алматы', '+7 701 234 5678', 'nurlan@example.com'),
('011023B000002', 'Айнур', 'Касимова', 'Кайратовна', '1988-08-22', 'F', 'active', '2019-06-20', '2024-06-20', 'МВД Астана', 'г. Астана', '+7 702 345 6789', 'ainur@example.com');

INSERT INTO license_categories (driver_id, category, issue_date, expiry_date)
VALUES 
(1, 'B', '2020-03-10', '2025-03-10'),
(1, 'C', '2021-06-15', '2026-06-15'),
(2, 'B', '2019-06-20', '2024-06-20');