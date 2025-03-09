from ultralytics import YOLO
import cv2

# Load the YOLO model
model = YOLO("yolov8n.pt")

# Load video
video_path = "../data/test_video.mp4"
cap = cv2.VideoCapture(video_path)

# Output video settings
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('../data/output_video.avi', fourcc, 20.0, (640, 480))

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break  # Exit if video ends

    # Run YOLO on the frame
    results = model(frame)

    # Draw results
    frame = results[0].plot()

    # Show frame
    cv2.imshow("YOLO Detection", frame)
    out.write(frame)

    # Press 'q' to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
out.release()
cv2.destroyAllWindows()