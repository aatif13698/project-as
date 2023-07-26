export  function formatTimestamp(timestamp) {
    const now = new Date();
    const providedDate = new Date(timestamp);

    const isToday = now.toDateString() === providedDate.toDateString();
    const isYesterday =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1
      ).toDateString() === providedDate.toDateString();

    let formattedTime = "";

    if (isToday) {
      formattedTime = providedDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      formattedTime += " today";
    } else if (isYesterday) {
      formattedTime = providedDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      formattedTime += " yesterday";
    } else {
      formattedTime = providedDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    }

    return formattedTime;
  }
