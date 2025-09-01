-- Insertar empresas de prueba
INSERT INTO empresas (id, nombre, cuit, tipo, fecha_adhesion, activa) VALUES
-- Empresas que se adhirieron en el último mes
('emp-001', 'TechStart Solutions SRL', '20-12345673-9', 'PYME', NOW() - INTERVAL '15 days', true),
('emp-002', 'Innovación Digital SA', '30-87654321-0', 'CORPORATIVA', NOW() - INTERVAL '20 days', true),
('emp-003', 'MicroServicios Ltda', '20-11111111-1', 'PYME', NOW() - INTERVAL '5 days', true),
('emp-004', 'Global Enterprise Corp', '30-22222222-2', 'CORPORATIVA', NOW() - INTERVAL '10 days', true),
('emp-005', 'StartUp Financiera', '20-33333333-3', 'PYME', NOW() - INTERVAL '25 days', true),

-- Empresas adheridas hace más de un mes (para contraste)
('emp-006', 'Empresa Antigua SA', '30-44444444-4', 'CORPORATIVA', NOW() - INTERVAL '45 days', true),
('emp-007', 'Vieja Compañía SRL', '20-55555555-5', 'PYME', NOW() - INTERVAL '60 days', true),
('emp-008', 'Histórica Ltda', '20-66666666-6', 'PYME', NOW() - INTERVAL '90 days', false),

-- Empresas más recientes para transferencias
('emp-009', 'FinTech Moderna', '30-77777777-7', 'CORPORATIVA', NOW() - INTERVAL '2 days', true),
('emp-010', 'PayTech Solutions', '20-88888888-8', 'PYME', NOW() - INTERVAL '7 days', true);

-- Insertar transferencias de prueba
INSERT INTO transferencias (id, empresa_id, monto, fecha, descripcion) VALUES
-- Transferencias del último mes
('trans-001', 'emp-001', 15000.50, NOW() - INTERVAL '5 days', 'Transferencia de fondos operativos'),
('trans-002', 'emp-002', 250000.00, NOW() - INTERVAL '10 days', 'Inversión en infraestructura'),
('trans-003', 'emp-003', 8500.25, NOW() - INTERVAL '15 days', 'Pago a proveedores'),
('trans-004', 'emp-004', 500000.75, NOW() - INTERVAL '8 days', 'Expansión internacional'),
('trans-005', 'emp-005', 12000.00, NOW() - INTERVAL '20 days', 'Capital de trabajo'),
('trans-006', 'emp-009', 75000.00, NOW() - INTERVAL '3 days', 'Desarrollo de producto'),
('trans-007', 'emp-010', 22000.30, NOW() - INTERVAL '12 days', 'Marketing digital'),
('trans-008', 'emp-001', 5500.00, NOW() - INTERVAL '25 days', 'Gastos administrativos'),
('trans-009', 'emp-002', 180000.00, NOW() - INTERVAL '18 days', 'Adquisición de equipos'),
('trans-010', 'emp-004', 320000.50, NOW() - INTERVAL '6 days', 'Fusión empresarial'),

-- Múltiples transferencias para la misma empresa
('trans-011', 'emp-001', 3200.00, NOW() - INTERVAL '2 days', 'Transferencia adicional 1'),
('trans-012', 'emp-001', 7800.75, NOW() - INTERVAL '1 days', 'Transferencia adicional 2'),

-- Transferencias de hace más de un mes (para contraste)
('trans-013', 'emp-006', 100000.00, NOW() - INTERVAL '35 days', 'Transferencia antigua'),
('trans-014', 'emp-007', 45000.00, NOW() - INTERVAL '50 days', 'Operación histórica'),

-- Transferencias muy recientes (último día)
('trans-015', 'emp-003', 1500.00, NOW() - INTERVAL '6 hours', 'Transferencia de hoy'),
('trans-016', 'emp-009', 89000.00, NOW() - INTERVAL '12 hours', 'Operación urgente');