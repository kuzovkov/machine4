DROP table  symbol;

CREATE TABLE public.symbol (
  id BIGSERIAL NOT NULL,
  name CHARACTER VARYING(100),
  scode CHARACTER VARYING(50),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  price NUMERIC(9,6)
);

ALTER TABLE public.symbol OWNER TO parser;
create unique index index_symbol_id on public.symbol(scode);

CREATE FUNCTION check_symbol_update() RETURNS trigger AS '
BEGIN
  UPDATE symbol SET updated_at = CURRENT_TIMESTAMP WHERE id=OLD.id;
  RETURN OLD;
END;
' LANGUAGE plpgsql;

CREATE TRIGGER check_update
AFTER UPDATE ON symbol
FOR EACH ROW
WHEN (OLD.price IS DISTINCT FROM NEW.price)
EXECUTE PROCEDURE check_symbol_update();





