import { useState, useEffect } from "react";
import axiosApi from "../../lib/axios";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Delete, NoteAdd, Save } from "@mui/icons-material";
import NoteForm from "./NoteForm";
import axios from "axios";

axios.defaults.baseURL = `http://localhost:7000/api`;

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteForm, setNoteForm] = useState("");
  const [isDrafted, setIsDrafted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const {
    auth: { user },
  } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, [user]);

  const fetchNotes = async () => {
    try {
      const allNotes = JSON.parse(localStorage.getItem("notes"));
      if (allNotes) return setNotes(allNotes);
      const {
        data: { notes },
        status,
      } = await axios(`notes/${user._id}`);
      if (status !== 200) return;

      setNotes(notes);
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async () => {
    console.log(noteForm);
    if (!noteForm) return;
    const noteObj = { text: noteForm, user_id: user._id };
    try {
      const {
        data: { newNote },
        status,
      } = await axios.post(`notes`, noteObj);
      if (status !== 200) return;

      const storageNotes = JSON.parse(localStorage.getItem("notes"));
      const newNotes = [...storageNotes, newNote];
      setNotes(newNotes);
      localStorage.setItem("notes", JSON.stringify(newNotes));
      setNoteForm("");
      setShowForm(false);
      setIsDrafted(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDraft = () => {
    localStorage.removeItem("drafted_note");
    setNoteForm("");
    setIsDrafted(false);
  };

  return (
    <Box m={2} p={2}>
      <Typography my={2} variant="h3">Notes</Typography>
      <Box>
        <Stack
          direction="row"
          mb={2}
          justifyContent="space-between"
          width="50%"
        >
          <Button
            variant="outline"
            endIcon={<NoteAdd />}
            sx={{ borderRadius: 3, bgcolor: "#3da58a", mr: 2 }}
            onClick={() => setShowForm((prev) => !prev)}
          >
            Create Note
          </Button>

          {isDrafted && (
            <>
              <IconButton onClick={() => setShowForm(true)}>
                <Save sx={{ color: "black" }} />
              </IconButton>

              <Button
                variant="contained"
                endIcon={<Delete />}
                sx={{ borderRadius: 3, bgcolor: "#db4f4a" }}
                onClick={deleteDraft}
              >
                Delete Draft
              </Button>
            </>
          )}
        </Stack>

        {setShowForm && (
          <NoteForm
            {...{
              noteForm,
              setNoteForm,
              showForm,
              setShowForm,
              createNote,
              setIsDrafted,
            }}
          />
        )}

        {notes?.map((note) => (
          <Card
            key={`note-${note._id}`}
            sx={{ borderRadius: 3, width: "50%", p: 1, my: 2 }}
            elevation={5}
          >
            <CardContent>
              <Typography variant="h6">{note.text}</Typography>
              <Typography variant="h7" sx={{ color: "lightgrey" }}>
                {new Date(note.createdAt).toDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Notes;
