const Y = require("yjs");
const buffer = require("lib0/dist/buffer.cjs");

const PGPool = require("pg").Pool;
const jsBase64 = require("js-base64");

const db = new PGPool({
  connectionString: "postgres://username:password@127.0.0.1:5432/db_name"
});

const message =
  "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";

module.exports = {
  bindState: (id, doc) => {
    console.log("get", id);
    // Y.applyUpdate(doc, jsBase64.toUint8Array(message));

    db.query("SELECT state from documents WHERE id = $1 LIMIT 1", [id])
      .then(res => {
        if (res.rows.length > 0) {
          const state = res.rows[0].state;
          Y.applyUpdate(doc, buffer.fromBase64(state));
        }
      })
      .catch(e => {
        console.log("failed to load", id, e);
      });
  },

  writeState: async (id, doc) => {
    const state = Y.encodeStateAsUpdate(doc);
    console.log(state);
    db.query("SELECT state from documents WHERE id = $1 LIMIT 1", [id])
      .then(res => {
        if (res.rows.length > 0) {
          return db
            .query("UPDATE documents SET state = $1 WHERE id = $2", [
              buffer.toBase64(state),
              id
            ])
            .then(res => {
              console.log("updated", res);
            })
            .catch(e => {
              console.log("failed to update", id, e);
            });
        } else {
          return db
            .query("INSERT INTO documents (id, state) VALUES ($2, $1)", [
              buffer.toBase64(state),
              id
            ])
            .then(res => {
              console.log("inserted", res);
            })
            .catch(e => {
              console.log("failed to update", id, e);
            });
        }
      })
      .catch(e => {
        console.log("failed to update", id, e);
      });
  }
};
