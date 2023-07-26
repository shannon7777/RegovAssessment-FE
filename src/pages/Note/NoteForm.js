import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

const NoteForm = ({
  noteForm,
  setNoteForm,
  showForm,
  setShowForm,
  createNote,
  setIsDrafted,
}) => {
  useEffect(() => {
    if (!showForm) return;
    const draftNote = () => {
      console.log(`saved in local storage`);
      localStorage.setItem("drafted_note", JSON.stringify(noteForm));
      setIsDrafted(true);
    };

    const interval = setInterval(draftNote, 1000);
    return () => clearInterval(interval);
  }, [noteForm]);

  useEffect(() => {
    const draftedNote = JSON.parse(localStorage.getItem("drafted_note"));
    if (draftedNote) {
      setNoteForm(draftedNote);
      setIsDrafted(true);
    }
  }, []);

  return (
    <Dialog open={showForm} onClose={() => setShowForm(false)}>
      <Typography m={3} mb={0} variant="h4">
        Create Note
      </Typography>

      <DialogContent sx={{ minWidth: 400 }}>
        <TextField
          autoFocus
          fullWidth
          multiline
          name="noteForm"
          type="text"
          margin="dense"
          label="This note will be drafted.."
          variant="outlined"
          rows={6}
          onChange={(e) => setNoteForm(e.target.value)}
          value={noteForm}
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={() => setShowForm(false)}
          sx={{ bgcolor: "#db4f4a" }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{ bgcolor: "#3da58a" }}
          onClick={createNote}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteForm;
