### Sử dụng pgvector để lưu docs

chạy docker

```bash
docker compose up -d
```

truy cập vào db trong container docker

```bash
docker exec -it <container_name> psql -U <POSTGRES_USER> -d <POSTGRES_DB>
```

Tạo extension pgvector

```bash
CREATE EXTENSION IF NOT EXISTS vector;
SELECT extname FROM pg_extension WHERE extname = 'vector';
```

Kết quả mong muốn:

```bash
 extname
---------
 vector
(1 row)
```
