# 01-streaming-rows-from-postgres

Miliony wierszy do pobrania i trzymania w pamięci? Brzmi jak kłopoty. O ile Twoja baza danych wspiera strumienie (`pg-query-stream` dla Postgres), możesz nie martwić się o zadyszkę czy ustanie pracy serca!

# 02-transforming-entities-to-dto

Skoro już przesyłamy dane partiami, jak zmienić dane "w locie"? [Stream Transformer](https://nodejs.org/api/stream.html#stream_class_stream_transform) na ratunek! 