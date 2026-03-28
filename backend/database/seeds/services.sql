-- ============================================================
-- Workzy Platform — Seed Data
-- Services catalogue based on services.txt
-- ============================================================

INSERT INTO services (service_name, category, description, base_price) VALUES
-- Cleaning
('House Cleaner',        'Cleaning', 'Complete house cleaning service',         150.00),
('Maid',                 'Cleaning', 'Daily maid services for home',            200.00),
('Bathroom Cleaner',     'Cleaning', 'Deep bathroom cleaning and sanitisation', 100.00),
('Kitchen Cleaner',      'Cleaning', 'Kitchen deep clean and degreasing',       150.00),
('Sofa Cleaner',         'Cleaning', 'Sofa and upholstery dry cleaning',        100.00),
('Carpet Cleaner',       'Cleaning', 'Carpet shampooing and stain removal',     100.00),
('Window Cleaner',       'Cleaning', 'Window and glass cleaning',               200.00),
('Deep Cleaning Worker', 'Cleaning', 'Full home deep cleaning service',         200.00),
('Office Cleaner',       'Cleaning', 'Office and commercial space cleaning',    200.00),
-- Plumbing
('Plumber',              'Plumbing', 'General plumbing repairs and installation',150.00),
('Pipe Repair Worker',   'Plumbing', 'Leaking and burst pipe repair',           300.00),
('Tap Repair',           'Plumbing', 'Tap fitting and repair',                  100.00),
('Toilet Repair',        'Plumbing', 'Toilet flush, seat and blockage repair',  250.00),
('Water Leakage Repair', 'Plumbing', 'Detect and fix water leaks',              100.00),
('Water Tank Cleaner',   'Plumbing', 'Overhead and underground tank cleaning',  100.00),
('Borewell Worker',      'Plumbing', 'Borewell drilling and maintenance',       500.00),
-- Electrical
('Electrician',          'Electrical', 'General electrical work and wiring',    350.00),
('Wiring Technician',    'Electrical', 'New wiring and rewiring',               100.00),
('Fan Installation',     'Electrical', 'Ceiling and exhaust fan installation',  200.00),
('Light Installation',   'Electrical', 'Light fitting and replacement',         150.00),
('Switch Board Repair',  'Electrical', 'Switch board and socket repair',        200.00),
('Inverter Technician',  'Electrical', 'Inverter installation and repair',      200.00),
('CCTV Installer',       'Electrical', 'CCTV camera installation and setup',    400.00),
-- Appliance Repair
('AC Technician',         'Appliance Repair', 'AC servicing, gas refill, repair',      300.00),
('Refrigerator Technician','Appliance Repair','Fridge repair and gas refill',          400.00),
('Washing Machine Technician','Appliance Repair','Washing machine repair',             250.00),
('TV Repair Technician',  'Appliance Repair', 'LED, LCD, Smart TV repair',            200.00),
('RO/Water Purifier Technician','Appliance Repair','RO service and membrane change',   150.00),
('Microwave Repair',      'Appliance Repair', 'Microwave oven repair',                 100.00),
('Mobile Repair Technician','Appliance Repair','Mobile screen and hardware repair',    200.00),
('Laptop Repair Technician','Appliance Repair','Laptop hardware and software repair',  300.00),
-- Carpenter
('Carpenter',             'Carpenter', 'General carpentry work',                100.00),
('Furniture Repair',      'Carpenter', 'Furniture fixing and polishing',        100.00),
('Door Repair',           'Carpenter', 'Door hinges, frames and locks',         150.00),
('Window Repair',         'Carpenter', 'Window frames and shutters repair',     250.00),
('Modular Furniture Installer','Carpenter','Modular kitchen and wardrobe install',100.00),
('Bed Assembly Worker',   'Carpenter', 'Bed frame assembly and fixing',         100.00),
-- Construction
('Mason',       'Construction', 'Brick laying and masonry work',               100.00),
('Tile Worker', 'Construction', 'Floor and wall tile laying',                   150.00),
('Marble Worker','Construction','Marble flooring and polishing',                100.00),
('Painter',     'Construction', 'Interior and exterior wall painting',          100.00),
('POP Worker',  'Construction', 'False ceiling and POP work',                   100.00),
('Welder',      'Construction', 'Metal welding and fabrication',                100.00),
('Labour Worker','Construction','General construction labour',                  100.00),
-- Moving
('Packers and Movers',  'Moving', 'Full packing and moving service',           500.00),
('Furniture Moving Helper','Moving','Help moving heavy furniture',               600.00),
('Delivery Boy',        'Moving', 'Local parcel and grocery delivery',          200.00),
('Loader / Unloader',   'Moving', 'Loading and unloading goods',                300.00),
-- Home Services
('Cook / Chef',       'Home Services', 'Home cooking and meal preparation',     300.00),
('Babysitter',        'Home Services', 'Child care and babysitting',            100.00),
('Elder Caretaker',   'Home Services', 'Senior citizen care and assistance',    300.00),
('Nurse',             'Home Services', 'Home nursing and medical assistance',   400.00),
('Security Guard',    'Home Services', 'Home and premises security',            400.00),
('Gardener',          'Home Services', 'Garden maintenance and planting',       250.00),
('Driver',            'Home Services', 'Personal driver for car or bike',       400.00),
('Personal Trainer',  'Home Services', 'Home fitness training sessions',        300.00)
ON CONFLICT DO NOTHING;
