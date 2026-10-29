-- El formulario de contacto guarda también el email.
alter table public.contactos add column email text check (char_length(email) <= 254);
