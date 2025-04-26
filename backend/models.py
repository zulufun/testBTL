from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class NetworkFlow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    flow_duration = db.Column(db.Interval, nullable=False, comment="The total duration of the flow, indicating how long the connection lasted.")
    total_fwd_packets = db.Column(db.Integer, nullable=False, comment="The number of packets sent in the forward direction.")
    total_bwd_packets = db.Column(db.Integer, nullable=False, comment="The number of packets sent in the backward direction.")
    total_length_fwd_packets = db.Column(db.BigInteger, nullable=False, comment="The total size of packets sent in the forward direction.")
    total_length_bwd_packets = db.Column(db.BigInteger, nullable=False, comment="The total size of packets sent in the backward direction.")
    fwd_packet_length_mean = db.Column(db.Float, nullable=False, comment="The average size of packets sent in the forward direction.")
    bwd_packet_length_mean = db.Column(db.Float, nullable=False, comment="The average size of packets sent in the backward direction.")
    flow_bytes_per_sec = db.Column(db.Float, nullable=False, comment="The number of bytes transferred per second.")
    flow_packets_per_sec = db.Column(db.Float, nullable=False, comment="The number of packets transmitted per second.")

    def __repr__(self):
        return f"<NetworkFlow {self.id} - Duration: {self.flow_duration}>"

# Initialize the database in your application setup
# from your application file (e.g., app.py)
# from models import db
# db.init_app(app)