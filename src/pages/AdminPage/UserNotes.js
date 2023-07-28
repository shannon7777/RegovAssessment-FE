import { useState } from "react";
import { Note } from "@mui/icons-material";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const UserNotes = ({ user }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState([]);

  const fetchUsersNotes = async () => {
    setShowNotes(true);
    try {
      const {
        data: { notes },
        status,
      } = await axios(`notes/${user._id}`);
      if (status !== 200) return;
      setNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton
        sx={{
          ":hover": {
            background: "grey",
          },
        }}
        onClick={fetchUsersNotes}
      >
        <Note sx={{ color: "white" }} />
      </IconButton>

      {showNotes && (
        <Dialog open={showNotes} onClose={() => setShowNotes(false)}>
          <Typography m={3} mb={0} variant="h5">
            {`${user.firstName} ${user.lastName}'s Notes`}
          </Typography>
          <Divider />

          <DialogContent>
            {notes.map((note, index) => (
              <Stack key={note._id} direction="row">
                <Typography variant="h6">{index + 1}: </Typography>
                <Typography mx={1} variant="h6">
                  {note.text}
                </Typography>
              </Stack>
            ))}
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              onClick={() => setShowNotes(false)}
              sx={{ bgcolor: "#db4f4a" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default UserNotes;
