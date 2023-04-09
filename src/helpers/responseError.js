exports.responseError = {
  "P2000": (res) => res.status(400).json({
    success: false,
    message: "The provided value for the column is too long for the column's type.",
  }),
  "P2003": (res) => res.status(400).json({
    success: false,
    message: `Foreign key constraint failed on the field`,
  }),
  "P2025": (res) => res.status(404).json({
    success: false,
    message: "An operation failed because it depends on one or more records that were required but not found",
  }),
}