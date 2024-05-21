const btn = document.querySelector('#favouriteBtn');

console.log("Running");

btn.addEventListener('click', async () => {
  try {
    const songId = btn.dataset.song;
    console.log("Working");

    const response = await axios.post(`/addfav/${songId}`);

    if (response.status === 200) {
      console.log("Success");
      // You can add any further actions you want to perform upon successful response here.
    } else {
      throw new Error('Failed to like/unlike the song');
    }
  } catch (error) {
    console.error(error);
    // You can handle the error condition here, such as displaying a message to the user.
  }
});
